import { Urls } from "~/types/enums";

export function setTourDone() {
    localStorage.setItem('tourDone', 'true');
}

export function isTourDone() {
    return localStorage.getItem('tourDone') === 'true';
}

export function redirectHelp() {
    setTourDone();
    useRouter().push(Urls.Help);
}