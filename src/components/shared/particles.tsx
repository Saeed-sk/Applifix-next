'use client'
import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

export interface ParticleBackgroundProps {
    /** Optional container className for styling */
    className?: string;
    /** Background color of the canvas */
    backgroundColor?: string;
    /** Color of the particles */
    particleColor?: string;
    /** Color of the links between particles */
    linkColor?: string;
    /** Number of particles */
    particleCount?: number;
    /** Particle size range */
    sizeRange?: { min: number; max: number };
    /** Movement speed of particles */
    speed?: number;
    /** Shape of particles: "circle", "square", etc. */
    shapeType?: string;
    /** Interaction enabled (click/hover) */
    enableInteractivity?: boolean;
    /** Distance for particle links */
    linkDistance?: number;
    /** Display variant: "default" or "stars" */
    variant?: 'default' | 'stars';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
                                                                          className = "",
                                                                          backgroundColor = "transparent",
                                                                          particleColor = "#ffffff",
                                                                          linkColor = "#ffffff",
                                                                          particleCount = 80,
                                                                          sizeRange = { min: 1, max: 5 },
                                                                          speed = 6,
                                                                          shapeType = "circle",
                                                                          enableInteractivity = true,
                                                                          linkDistance = 150,
                                                                          variant = 'default',
                                                                      }) => {
    const [initDone, setInitDone] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInitDone(true));
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log("Particles loaded:", container);
    };

    const options: ISourceOptions = useMemo(() => {
        const base: ISourceOptions = {
            background: { color: { value: backgroundColor } },
            fpsLimit: 60,
            fullScreen: { enable: false },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onClick: { enable: enableInteractivity, mode: "push" },
                    onHover: { enable: enableInteractivity, mode: "repulse" },
                    resize: { enable: true },
                },
                modes: {
                    push: { quantity: 4 },
                    repulse: { distance: 200, duration: 0.4 },
                },
            },
            particles: {
                color: { value: particleColor },
                links: {
                    color: linkColor,
                    distance: linkDistance,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: { default: OutMode.out },
                    random: false,
                    speed,
                    straight: false,
                },
                number: { density: { enable: true }, value: particleCount },
                opacity: { value: 0.5 },
                shape: { type: shapeType as any },
                size: { value: sizeRange },
            },
            detectRetina: true,
        };

        if (variant === 'stars' && base.interactivity) {
            return {
                ...base,
                interactivity: {
                    ...base.interactivity,
                    events: {
                        ...base.interactivity.events,
                        onClick: { enable: false, mode: "" },
                        onHover: { enable: false, mode: "" },
                    },
                },
                particles: {
                    ...base.particles,
                    links: { enable: false },
                    shape: { type: 'star' },
                    size: { value: { min: 1, max: 3 } },
                    move: { ...base.particles?.move, speed: 0.5 },
                    twinkle: { particles: { enable: true, frequency: 0.1, opacity: 0.7 } },
                },
            };
        }

        return base;
    }, [
        backgroundColor,
        particleColor,
        linkColor,
        particleCount,
        sizeRange,
        speed,
        shapeType,
        enableInteractivity,
        linkDistance,
        variant,
    ]);

    return initDone ? (
        <Particles
            id="tsparticles"
            className={cn('w-full h-full fixed overflow-clip !right-0 top-0 -z-50  ', className)}
            options={options}
            particlesLoaded={particlesLoaded}
        />
    ) : null;
};

export default ParticleBackground;
