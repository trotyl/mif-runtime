import { setPackageInfo, PackageInfo } from './context'

const existingPkgInfo = System.constructor.prototype.pkgInfo

function pkgInfo(this: typeof System, info: PackageInfo) {
  setPackageInfo(info)
  
  if (existingPkgInfo != null) {
    existingPkgInfo.call(this, info)
  }
}

System.constructor.prototype.pkgInfo = pkgInfo
