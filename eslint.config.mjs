import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 加载 Next.js 的旧版配置（通过 FlatCompat 转换）
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // 添加 simple-import-sort 插件
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]]
        }
      ],
      "simple-import-sort/exports": "error",
    },
  },
];
 
export default eslintConfig;
