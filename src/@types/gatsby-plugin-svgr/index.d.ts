declare module "*.svg" {
  export const ReactComponent: React.StatelessComponent<
    React.SVGAttributes<SVGElement>
  >
  const src: string

  export default src
}
