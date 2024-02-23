export const useNavigationItem = (url: UrlsUnion) => {
  return useNavigationItems().value.find((item: NavigationItem) => item.to === url)
}
