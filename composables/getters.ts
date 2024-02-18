import type { EUrls, INavigationItem } from "~/types/navigation"

export const useNavigationItem = (eurl: EUrls) => {
  return useNavigationItems().value.find((item: INavigationItem) => item.to === eurl)
}
