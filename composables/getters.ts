export const useNavigationItem = (url: UrlsValues) => {
  return useNavigationItems().value.find((item: NavigationItem) => item.to === url)
}
