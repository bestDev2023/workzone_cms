import moduleAlias from "module-alias"

export function registerModulesAlias(): void {
  // TODO use https://github.com/LeDDGroup/typescript-transform-paths?
  moduleAlias.addAliases({
    "@": __dirname,
    "@shared": `${__dirname}../../../shared`,
    "bitbucket-api": `${__dirname}../../../bitbucket-api/dist`,
    "@sample": `${__dirname}../../../sample`,
    "@generated": `${__dirname}../../out/generated`,
  })
}
