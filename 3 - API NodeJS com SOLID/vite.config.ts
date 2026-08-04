import { defineConfig } from "vitest/config";
import paths from 'vite-tsconfig-paths'


export default defineConfig({
    plugins: [paths()],
    test: {
        dir: 'src',
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    dir: 'src/use-case'
                }
            },
            {
                extends: true,
                test: {
                    name: 'e2e',
                    dir: 'src/http/controller',
                    environment: './prisma/test-enviroments-prisma/prisma-enviroments-test.ts'
                }
            }
        ]
    }
})