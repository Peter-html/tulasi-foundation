import React, {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';

import {
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';

/* =========================================================
   ERROR BOUNDARY
========================================================= */

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="w-[280px] rounded-2xl border border-white/15 bg-[#102c1c]/95 px-5 py-4 text-center text-xs leading-5 text-white/75 backdrop-blur-md">
            3D model could not be loaded.
            <br />
            Check the GLB file path.
          </div>
        </Html>
      );
    }

    return this.props.children;
  }
}

/* =========================================================
   LOADER
========================================================= */

const LoadingModel = () => {
  return (
    <Html center>
      <div className="rounded-full border border-white/15 bg-[#102c1c]/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
        Loading 3D model
      </div>
    </Html>
  );
};

/* =========================================================
   VILLA MODEL
========================================================= */

const VillaModel = ({
  src,
  rotationY = 0,
}) => {
  const { scene } = useGLTF(src);

  const preparedScene = useMemo(() => {
    const clone = scene.clone(true);

    /* ---------------------------------------------
       Calculate original bounding box
    --------------------------------------------- */

    const box = new THREE.Box3().setFromObject(clone);

    const size = box.getSize(
      new THREE.Vector3()
    );

    const center = box.getCenter(
      new THREE.Vector3()
    );

    /*
     * AI models sometimes include a large ground
     * mesh around the building.
     *
     * We deliberately make the model much larger
     * than the previous automatic fit.
     */

    const horizontalSize = Math.max(
      size.x,
      size.z
    );

    const scale =
      horizontalSize > 0
        ? 7 / horizontalSize
        : 1;

    clone.scale.setScalar(scale);

    /*
     * Centre horizontally.
     *
     * We DON'T use the total model height as the
     * main camera reference anymore.
     */

    clone.position.x =
      -center.x * scale;

    clone.position.z =
      -center.z * scale;

    clone.position.y =
      -box.min.y * scale;

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.side =
            THREE.DoubleSide;
        }
      }
    });

    return clone;
  }, [scene]);

  return (
    <group
      rotation={[
        0,
        rotationY,
        0,
      ]}
      scale={1.65}
      position={[0, -0.8, 0]}
    >
      <primitive object={preparedScene} />
    </group>
  );
};

/* =========================================================
   CAMERA SETUP
========================================================= */

const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    /*
     * Initial premium architectural angle.
     *
     * Slightly above eye level,
     * but not looking down from the sky.
     */

    camera.position.set(
      0,
      2.25,
      8
    );

    camera.lookAt(
      0,
      1.15,
      0
    );

    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};

/* =========================================================
   MAIN VIEWER
========================================================= */

const ConceptVillaViewer = ({
  modelUrl = '/models/concept-villa.glb',
  rotationY = 0,
  className = '',
}) => {
  const controlsRef = useRef();

  return (
    <div
      className={`
        relative
        h-[620px]
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-[#112c1d]
        md:h-[720px]
        lg:h-[760px]
        ${className}
      `}
    >

      {/* =============================================
          LABELS
      ============================================== */}

      <div className="pointer-events-none absolute left-5 top-5 z-20 flex flex-wrap gap-2">

        <span className="rounded-full border border-white/15 bg-black/25 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
          Concept model
        </span>

        <span className="rounded-full border border-white/15 bg-black/25 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
          180° exterior view
        </span>

      </div>

      {/* =============================================
          INSTRUCTIONS
      ============================================== */}

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">

        Drag to rotate · Scroll to zoom

      </div>

      {/* =============================================
          CANVAS
      ============================================== */}

      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          position: [
            0,
            2.25,
            8,
          ],

          fov: 38,

          /*
           * Smaller near value prevents parts of
           * the house disappearing while zooming.
           */

          near: 0.01,

          far: 200,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{
          cursor: 'grab',
        }}
        onPointerDown={(event) => {
          event.currentTarget.style.cursor =
            'grabbing';
        }}
        onPointerUp={(event) => {
          event.currentTarget.style.cursor =
            'grab';
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.cursor =
            'grab';
        }}
      >

        {/* Background */}

        <color
          attach="background"
          args={['#112c1d']}
        />

        {/* Camera */}

        <CameraSetup />

        {/* ===========================================
            LIGHTING
        ============================================ */}

        <ambientLight
          intensity={1.7}
        />

        <hemisphereLight
          intensity={1.25}
          groundColor="#24432f"
        />

        <directionalLight
          castShadow
          position={[
            6,
            9,
            7,
          ]}
          intensity={2.5}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <directionalLight
          position={[
            -5,
            5,
            -4,
          ]}
          intensity={1}
        />

        {/* ===========================================
            MODEL
        ============================================ */}

        <Suspense
          fallback={<LoadingModel />}
        >

          <ModelErrorBoundary
            key={modelUrl}
          >

            <VillaModel
              src={modelUrl}
              rotationY={rotationY}
            />

          </ModelErrorBoundary>

          <Environment
            preset="city"
          />

        </Suspense>

        {/* ===========================================
            180 DEGREE CONTROLS
        ============================================ */}

        <OrbitControls
          ref={controlsRef}
          makeDefault

          /*
           * Camera always rotates around
           * centre of house.
           */

          target={[
            0,
            1.05,
            0,
          ]}

          enablePan={false}

          enableZoom

          enableRotate

          enableDamping

          dampingFactor={0.055}

          rotateSpeed={0.55}

          zoomSpeed={0.7}

          /* Close-up limit */

          minDistance={3.2}

          /* Maximum zoom-out */

          maxDistance={10}

          /*
           * Prevent camera going underneath
           * or directly above the house.
           */

          minPolarAngle={
            Math.PI / 3.1
          }

          maxPolarAngle={
            Math.PI / 2.03
          }

          /*
           * EXACT 180 DEGREE RANGE

              LEFT ← FRONT → RIGHT

           * User cannot continuously rotate 360.
           */

          minAzimuthAngle={
            -Math.PI / 2
          }

          maxAzimuthAngle={
            Math.PI / 2
          }
        />

      </Canvas>

    </div>
  );
};

/* =========================================================
   PRELOAD
========================================================= */

useGLTF.preload(
  '/models/concept-villa.glb'
);

export default ConceptVillaViewer;