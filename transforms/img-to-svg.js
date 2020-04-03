export const parser = "tsx"

export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  return root
    .findJSXElements("img")
    .map(p => {
      const srcAttr = p.node.openingElement.attributes.find(
        attr => attr.name.name === "src"
      )
      const isRequire = srcAttr.value.expression.arguments
      const fileName = isRequire && srcAttr.value.expression.arguments[0].value

      if (!fileName) return p

      const componentName = fileName
        .slice(fileName.lastIndexOf("/"))
        .replace(".svg", "")
        .split("-")
        .join(",")
        .split("_")
        .join(",")
        .split(",")
        .map(part => {
          const s = part.replace(/\W/g, "")
          return s.charAt(0).toUpperCase() + s.slice(1)
        })
        .join("")

      // Remove src and alt prop
      p.node.openingElement.attributes = p.node.openingElement.attributes.filter(
        attr => attr.name.name !== "src" && attr.name.name !== "alt"
      )

      p.node.openingElement.name.name = componentName
      const importNode = j.importDeclaration(
        [
          j.importSpecifier(
            j.identifier("ReactComponent"),
            j.identifier(componentName)
          ),
        ],
        j.literal(fileName)
      )

      const paths = root.find(j.ImportDeclaration).at(0)

      if (paths.length) {
        paths.get().insertBefore(importNode)
      }
      // return p.node.openingElement.name.name === "img"
      return p
    })
    .toSource()
  // findJSXElements("img").filter(element => element.hasAttributes("src"))
}
