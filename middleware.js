import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const url = req.nextUrl.pathname;

      if (url.startsWith("/dashboard") && token?.role === "admin") return true;
      if (url.startsWith("/dashboardMember") && token?.role === "member") return true;

      return false;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboardMember/:path*",
  ],
};
