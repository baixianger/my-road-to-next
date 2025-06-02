# 认证系统文档

这个目录包含了一个基于会话（Session）的认证系统实现，主要包含三个核心文件。

## 文件结构

- `auth.ts` - 核心认证逻辑
- `cookies.ts` - Cookie 管理
- `middleware.ts` - 请求中间件

## 1. auth.ts - 核心认证逻辑

实现了会话管理的核心功能：

### 会话生成
- `generateSessionToken()`: 生成随机会话令牌
- `createSession()`: 创建新会话，将用户ID与令牌关联，并设置30天过期时间

### 会话验证
- `validateSessionToken()`: 验证会话令牌有效性
  - 检查会话是否存在
  - 检查会话是否过期
  - 如果会话将在15天内过期，自动延长30天

### 会话销毁
- `invalidateSession()`: 使单个会话失效
- `invalidateAllSessions()`: 使用户的所有会话失效

## 2. cookies.ts - Cookie 管理

处理浏览器端的 Cookie 操作：

- `setSessionTokenCookie()`: 设置包含会话令牌的 HTTP-only Cookie
- `deleteSessionTokenCookie()`: 删除会话 Cookie
- `getCurrentSession()`: 获取当前会话（使用 React 的 cache 进行优化）

## 3. middleware.ts - 请求中间件

处理所有传入的 HTTP 请求：

### GET 请求处理
- 自动延长会话 Cookie 的过期时间
- 确保用户在浏览网站时保持登录状态

### CSRF 保护
- 验证请求来源（Origin 头）
- 防止跨站请求伪造攻击

## 工作流程

### 登录流程
1. 用户提交凭据
2. 验证凭据后，调用 `createSession()` 创建会话
3. 使用 `setSessionTokenCookie()` 将会话令牌存储在 Cookie 中

### 认证检查
- 使用 `getCurrentSession()` 检查用户是否已认证
- 如果会话有效，返回用户信息

### 登出流程
1. 调用 `invalidateSession()` 使当前会话失效
2. 调用 `deleteSessionTokenCookie()` 删除 Cookie

## 安全特性

### 会话令牌安全
- 使用加密强随机数生成令牌
- 存储令牌的哈希值而非原始值

### Cookie 安全
- 使用 HttpOnly 防止 XSS 攻击
- 在生产环境启用 Secure 标志（仅限 HTTPS）
- 设置 SameSite=Lax 防止 CSRF

### CSRF 保护
- 中间件验证 Origin 头
- 防止跨站请求伪造

## 使用示例

### 创建会话
```typescript
import { generateSessionToken, createSession } from "./auth";
import { setSessionTokenCookie } from "./cookies";

const token = generateSessionToken();
const session = await createSession(userId, token);
await setSessionTokenCookie(token, session.expiresAt);
```

### 验证会话
```typescript
import { getCurrentSession } from "./cookies";

const { session, user } = await getCurrentSession();
if (session) {
  // 用户已认证
} else {
  // 用户未认证
}
```

### 登出
```typescript
import { invalidateSession } from "./auth";
import { deleteSessionTokenCookie, getCurrentSession } from "./cookies";

const { session } = await getCurrentSession();
if (session) {
  await invalidateSession(session.id);
}
await deleteSessionTokenCookie();
```

这个认证系统设计简洁但功能完整，适合中小型 Next.js 应用使用。
