import { BladeController, View } from '@tweakpane/core'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { BladeApi, Pane } from 'tweakpane'

interface FPSGraph extends BladeApi<BladeController<View>> {
    begin(): void
    end(): void
}

export const gui = new Pane()
gui.registerPlugin(EssentialsPlugin)

export const fps_graph = gui.addBlade({
    view: 'fpsgraph',
    label: 'fpsgraph',
}) as FPSGraph