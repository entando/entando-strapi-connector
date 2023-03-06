import { useCallback } from "react";

/**
 * Small hook for handle the simple routing of strapi config
 * using the EPC framework router expose by AppBuilder.
 * @returns 
 */
export function useEPCRouter() {
  const matchPath = useCallback((path: string): boolean => {
    // window.entando.router is always present in EPC environment
    const router = window.entando?.router

    if (router) {
      return router.location.pathname.includes(path)
    } else {
      // fallback for development
      return window.location.pathname.includes(path)
    }
  }, [])

  return { matchPath }
}
