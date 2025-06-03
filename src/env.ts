import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
    server: {
        IMAGE_DIRECTORY: z.string().url(),
        API_PATH: z.string(),
    },
    client: {
        NEXT_PUBLIC_API_URL: z.string().url(),
        NEXT_PUBLIC_IMAGE_DIRECTORY: z.string().url(),
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    experimental__runtimeEnv: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_IMAGE_DIRECTORY: process.env.NEXT_PUBLIC_IMAGE_DIRECTORY,
    }
});