// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

// import {
//     ReactInstance, Component, ComponentState,
//     ReactElement, SFCElement, CElement,
//     DOMAttributes, DOMElement
// } from 'react';

// import { render } from 'react-snapshot';

declare module 'react-snapshot' {
    import {
        ReactInstance, Component, ComponentState,
        ReactElement, SFCElement, CElement,
        DOMAttributes, DOMElement
    } from 'react';

    export function render<P>(
        element: ReactElement<P>,
        container: Element | null,
        callback?: (component?: Component<P, ComponentState> | Element) => any
    ): Component<P, ComponentState> | Element | void;
}