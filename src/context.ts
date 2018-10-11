import semver from 'semver'

export type Load = [string[], Function]

export interface PackageInfo {
  name: string,
  version: string,
  dependencies: {
    [name: string]: { version: string, path?: string }
  },
}

let packageInfo: PackageInfo | null = null

export function getPackageInfo(): PackageInfo | null {
  return packageInfo
}

export function setPackageInfo(info: PackageInfo | null): void {
  packageInfo = info
}

const registry: Map<string, [string, Load][]> = new Map()

export function retrivePackage(name: string, criteria: string): Load | null {
  let versionInfoList: [string, Load][] | undefined = undefined
  if ((versionInfoList = registry.get(name)) != null) {
    for (const versionInfo of versionInfoList) {
      const [registeredVersion, load] = versionInfo
      if (semver.satisfies(registeredVersion, criteria)) {
        return load
      }
    }
  }

  return null
}

export function registerPackage(name: string, version: string, load: Load): void {
  if (!registry.has(name)) {
    registry.set(name, [])
  }
  
  const versionInfoList = registry.get(name)!
  if (versionInfoList.some(([registeredVersion]) => registeredVersion === version)) {
    return
  }

  versionInfoList.push([version, load])
  versionInfoList.sort(([va], [vb]) => semver.gt(va, vb) ? 1 : -1)
}
