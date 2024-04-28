import {
    authMiddleware,
    withAuth,
  } from "@kinde-oss/kinde-auth-nextjs/middleware";
  
  export default function middleware(req: Request) {
    return withAuth(req);
  }
  
  export const config = {
    matcher: ["/tester", "/account", "/cart", "/orders", "/reciept"],
  };
