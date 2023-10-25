// Load everything for coverage stats
export async function loadAllModules(options: {
  includeSpecs: boolean
}): Promise<Array<{[p: string]: unknown}>> {
  console.log("LOADING MODULES")
  const modules = import.meta.glob("/**/*.{ts,tsx}")
  const modulesLoaded = Object.entries(modules)
    .filter(
      ([path]) =>
        !path.includes("index.ts") &&
        !(path.includes(".spec.") && !options.includeSpecs)
    )
    .map(async ([path, module]) => {
      console.log(`path ->${path}`)
      return module()
    })

  return Promise.all(modulesLoaded)
}
