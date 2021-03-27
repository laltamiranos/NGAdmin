import { Action } from '@ngrx/store';
import { Tab } from 'src/app/shared/models/tab.model';

export const SET_TAB = '[TABS] Set Tab';
export const UPDATE_TAB = '[TABS] Update Tab';
export const UNSET_TAB = '[TABS] Unset Tab';
export const CLOSE_TAB = '[TABS] Close Tab';

export class SetTabAction implements Action {
    readonly type = SET_TAB;
    constructor(public tab: Tab) { }
};

export class UpdateTabAction implements Action {
    readonly type = UPDATE_TAB;
    constructor(public tab: Tab) { }
};

export class UnsetTabAction implements Action {
    readonly type = UNSET_TAB;
    constructor(public label: string) { }
};

export class CloseTabAction implements Action {
    readonly type = CLOSE_TAB;
    constructor(public label: string) { }
};

export type tabsActions =
    SetTabAction |
    UpdateTabAction |
    UnsetTabAction |
    CloseTabAction;