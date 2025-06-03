import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
    server: {
        IMAGE_DIRECTORY: z.string().url(),
        API_PATH: z.string().url(),
    },
    client: {
        NEXT_PUBLIC_API_PATH: z.string().url(),
        NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: z.string().min(1),
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    experimental__runtimeEnv: {
        NEXT_PUBLIC_API_PATH: process.env.NEXT_PUBLIC_API_PATH,
        NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    }
});