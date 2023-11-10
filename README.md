# Journey of JS to TS:

## In

1. Changing imports and exports from CJS to ES Modules.

2. Property 'authorization' does not exist on type 'Headers'.
   =>

   ```typescript
   import { Request, Response, NextFunction } from "express";
   ```

3. Property 'sendStatus' does not exist on type 'Response'.
   =>
	```typescript
	import { Request, Response, NextFunction } from "express";
	```

5. Property 'authorization' does not exist on type 'Headers'.
   =>
	```typescript
	import { Request, Response, NextFunction } from "express";
	```

6. Problem with id being a string `jwtAdminAuthentication`.
   =>
	```typescript
	if (typeof user === "string") {
		return res.sendStatus(403);
	}
	if (user) {
		req.headers.user = user.id; // source
		next();
	}
	```

## In `admin.ts`

1. "Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'" in router.get("/me")
