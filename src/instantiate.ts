import { retrivePackage, Load } from './context'

const exisingInstantiate = System.constructor.prototype.instantiate

function instantiate(this: typeof System, url: string, firstParentUrl: string) {
  if (!url.startsWith('mif:')) {
    return exisingInstantiate.call(this, url, firstParentUrl)
  }

  const [_, name, criteria, path] = url.split(':') as [void, string, string, string]
  
  let load: Load | null = null
  if ((load = retrivePackage(name, criteria)) != null) {
    return load
  }

  let requestUrl: Promise<string>
  if (path === '*') {
    // TODO: make it configurable
    requestUrl = this.resolve(`https://trotyl.github.io/${name}/${name.replace('mif-', '')}.mif.js`, firstParentUrl)
  } else {
    requestUrl = this.resolve(path, firstParentUrl)
  }

  return exisingInstantiate.call(this, requestUrl)
}

System.constructor.prototype.instantiate = instantiate
