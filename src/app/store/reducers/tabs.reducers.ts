import * as fromTabs from '../actions/tabs.actions';

import { Tab } from 'src/app/shared/models/tab.model';

export interface TabsState {
    list: Tab[];
};

const initState: TabsState = {
    list: [],
};

export function tabsReducer(state = initState, action: fromTabs.tabsActions): TabsState {
    switch (action.type) {
        case fromTabs.SET_TAB:
            let tab = state.list.filter(tabAdd => tabAdd.label == action.tab.label).length;
            if (tab == 0) {
                return {
                    list: [...state.list, action.tab]
                };
            } else {
                return {
                    list: state.list.map((x: Tab) => {
                        if (x.label == action.tab.label)
                            x.isBreadcrumb = action.tab.isBreadcrumb;

                        return x;
                    })
                };
            }
        case fromTabs.UPDATE_TAB:
            return {
                list: state.list.map((x: Tab) => {
                    if (x.label == action.tab.label)
                        x.isBreadcrumb = action.tab.isBreadcrumb;

                    return x;
                })
            };
        case fromTabs.UNSET_TAB:
            let tabsOutBreadcrumb = state.list.filter(tab => tab.isBreadcrumb == false);

            if (tabsOutBreadcrumb.find((x: Tab) => x.label == action.label)) {
                return {
                    list: state.list.filter(tabDelete => tabDelete.label != action.label)
                };
            }
            else {
                if (tabsOutBreadcrumb.length > 0) {
                    let firstOut = tabsOutBreadcrumb[0];

                    return {
                        list: state.list.filter((x: Tab) => {
                            if (x.label == firstOut.label) {
                                x.isBreadcrumb = true;
                                return x;
                            }
                            else if (x.label == action.label) { }
                            else return x;
                        })
                    }
                }
                else
                    return {
                        list: state.list.filter(tabDelete => tabDelete.label != action.label)
                    };
            }
        case fromTabs.CLOSE_TAB:
            return {
                list: state.list.filter(tabDelete => tabDelete.label != action.label)
            };

        default:
            return state;
    }
}
