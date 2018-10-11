import { getPackageInfo, registerPackage, setPackageInfo } from './context'

const existingRegister = System.constructor.prototype.register as Function

function register(this: typeof System, ...args: any[]): void {
  const pkgInfo = getPackageInfo()
  setPackageInfo(null)
  
  if (pkgInfo != null) {
    const [_, deps, declare] = args as [void, string[], Function]
    const syntehticDeps = deps.map(dep => {
      const depInfo = pkgInfo.dependencies[dep]
      return `mif:${dep}:${depInfo.version}:${depInfo.path}`
    })
    registerPackage(pkgInfo.name, pkgInfo.version, [syntehticDeps, declare])
    return existingRegister.call(this, syntehticDeps, declare)
  } 
  
  return existingRegister.apply(this, args)
}

System.constructor.prototype.register = register
