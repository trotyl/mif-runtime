import { retrivePackage, Load } from './context'

const exisingInstantiate = System.constructor.prototype.instantiate

function instantiate(this: typeof System, url: string, firstParentUrl: string) {
  if (!url.startsWith('mif:')) {
    return exisingInstantiate.call(this, url, firstParentUrl)
  }

  const [_, name, criteria, path] = url.split(':') as [void, string, string, string?]
  
  let load: Load | null = null
  if ((load = retrivePackage(name, criteria)) != null) {
    return load
  }

  if (path == null) {
    throw new Error(`Cannot instantiate module '${name}' of version '${criteria}' due to no matched version nor fallback path.`)
  }

  const requestUrl = this.resolve(path, firstParentUrl)
  return exisingInstantiate.call(this, requestUrl)
}

System.constructor.prototype.instantiate = instantiate
