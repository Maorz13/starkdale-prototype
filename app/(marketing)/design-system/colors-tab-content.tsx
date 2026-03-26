function ColorGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {children}
      </div>
    </div>
  )
}

function Swatch({
  name,
  cssVar,
  twBg,
  twText,
  lightValue,
  darkValue,
  paired,
}: {
  name: string
  cssVar: string
  twBg: string
  twText?: string
  lightValue: string
  darkValue: string
  paired?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className={`relative flex h-20 w-full items-center justify-center ${twBg}`}>
        {twText && (
          <span className={`text-2xl font-bold ${twText}`}>Aa</span>
        )}
        {paired && !twText && (
          <span className="text-2xl font-bold text-foreground/20">—</span>
        )}
      </div>
      <div className="space-y-1 p-3">
        <p className="text-xs font-medium">{name}</p>
        <code className="block text-[10px] text-muted-foreground">{`--${cssVar}`}</code>
        <code className="block text-[10px] text-muted-foreground">{`bg-${twBg.replace("bg-", "")}`}</code>
        <div className="mt-2 space-y-0.5 border-t pt-2">
          <p className="text-[10px] text-muted-foreground">
            <span className="font-medium text-foreground/60">L </span>{lightValue}
          </p>
          <p className="text-[10px] text-muted-foreground">
            <span className="font-medium text-foreground/60">D </span>{darkValue}
          </p>
        </div>
      </div>
    </div>
  )
}

function PairedSwatch({
  name,
  cssVar,
  fgCssVar,
  twBg,
  twFg,
  lightValue,
  darkValue,
  lightFgValue,
  darkFgValue,
}: {
  name: string
  cssVar: string
  fgCssVar: string
  twBg: string
  twFg: string
  lightValue: string
  darkValue: string
  lightFgValue: string
  darkFgValue: string
}) {
  return (
    <div className="col-span-2 overflow-hidden rounded-lg border">
      <div className={`relative flex h-20 w-full items-center justify-center ${twBg}`}>
        <span className={`text-3xl font-bold ${twFg}`}>Aa</span>
      </div>
      <div className="grid grid-cols-2 divide-x p-3">
        <div className="space-y-0.5 pr-3">
          <p className="text-xs font-medium">{name}</p>
          <code className="block text-[10px] text-muted-foreground">{`--${cssVar}`}</code>
          <div className="mt-1.5 space-y-0.5 border-t pt-1.5">
            <p className="text-[10px] text-muted-foreground"><span className="font-medium text-foreground/60">L </span>{lightValue}</p>
            <p className="text-[10px] text-muted-foreground"><span className="font-medium text-foreground/60">D </span>{darkValue}</p>
          </div>
        </div>
        <div className="space-y-0.5 pl-3">
          <p className="text-xs font-medium">{name} Foreground</p>
          <code className="block text-[10px] text-muted-foreground">{`--${fgCssVar}`}</code>
          <div className="mt-1.5 space-y-0.5 border-t pt-1.5">
            <p className="text-[10px] text-muted-foreground"><span className="font-medium text-foreground/60">L </span>{lightFgValue}</p>
            <p className="text-[10px] text-muted-foreground"><span className="font-medium text-foreground/60">D </span>{darkFgValue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ColorsTabContent() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8 pb-24">

      <p className="text-sm text-muted-foreground">
        All tokens are CSS variables defined in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">app/globals.css</code>.
        Swatches render live — toggle your theme to see dark mode values.
        <span className="ml-2 font-medium text-foreground/60">L = light</span>
        <span className="ml-2 font-medium text-foreground/60">D = dark</span>
      </p>

      {/* Base */}
      <ColorGroup title="Base">
        <PairedSwatch
          name="Background"
          cssVar="background"
          fgCssVar="foreground"
          twBg="bg-background"
          twFg="text-foreground"
          lightValue="oklch(1 0 0)"
          darkValue="oklch(0.145 0 0)"
          lightFgValue="oklch(0.145 0 0)"
          darkFgValue="oklch(0.985 0 0)"
        />
      </ColorGroup>

      {/* Surface */}
      <ColorGroup title="Surface">
        <PairedSwatch
          name="Card"
          cssVar="card"
          fgCssVar="card-foreground"
          twBg="bg-card"
          twFg="text-card-foreground"
          lightValue="oklch(1 0 0)"
          darkValue="oklch(0.205 0 0)"
          lightFgValue="oklch(0.145 0 0)"
          darkFgValue="oklch(0.985 0 0)"
        />
        <PairedSwatch
          name="Popover"
          cssVar="popover"
          fgCssVar="popover-foreground"
          twBg="bg-popover"
          twFg="text-popover-foreground"
          lightValue="oklch(1 0 0)"
          darkValue="oklch(0.205 0 0)"
          lightFgValue="oklch(0.145 0 0)"
          darkFgValue="oklch(0.985 0 0)"
        />
      </ColorGroup>

      {/* Brand */}
      <ColorGroup title="Brand">
        <PairedSwatch
          name="Primary"
          cssVar="primary"
          fgCssVar="primary-foreground"
          twBg="bg-primary"
          twFg="text-primary-foreground"
          lightValue="oklch(0.205 0 0)"
          darkValue="oklch(0.922 0 0)"
          lightFgValue="oklch(0.985 0 0)"
          darkFgValue="oklch(0.205 0 0)"
        />
        <PairedSwatch
          name="Secondary"
          cssVar="secondary"
          fgCssVar="secondary-foreground"
          twBg="bg-secondary"
          twFg="text-secondary-foreground"
          lightValue="oklch(0.97 0 0)"
          darkValue="oklch(0.269 0 0)"
          lightFgValue="oklch(0.205 0 0)"
          darkFgValue="oklch(0.985 0 0)"
        />
        <PairedSwatch
          name="Accent"
          cssVar="accent"
          fgCssVar="accent-foreground"
          twBg="bg-accent"
          twFg="text-accent-foreground"
          lightValue="oklch(0.97 0 0)"
          darkValue="oklch(0.269 0 0)"
          lightFgValue="oklch(0.205 0 0)"
          darkFgValue="oklch(0.985 0 0)"
        />
      </ColorGroup>

      {/* Muted */}
      <ColorGroup title="Muted">
        <PairedSwatch
          name="Muted"
          cssVar="muted"
          fgCssVar="muted-foreground"
          twBg="bg-muted"
          twFg="text-muted-foreground"
          lightValue="oklch(0.97 0 0)"
          darkValue="oklch(0.269 0 0)"
          lightFgValue="oklch(0.556 0 0)"
          darkFgValue="oklch(0.708 0 0)"
        />
      </ColorGroup>

      {/* Feedback */}
      <ColorGroup title="Feedback">
        <Swatch
          name="Destructive"
          cssVar="destructive"
          twBg="bg-destructive"
          lightValue="oklch(0.577 0.245 27.325)"
          darkValue="oklch(0.704 0.191 22.216)"
        />
      </ColorGroup>

      {/* Borders & Focus */}
      <ColorGroup title="Borders & Focus">
        <Swatch
          name="Border"
          cssVar="border"
          twBg="bg-border"
          lightValue="oklch(0.922 0 0)"
          darkValue="oklch(1 0 0 / 10%)"
        />
        <Swatch
          name="Input"
          cssVar="input"
          twBg="bg-input"
          lightValue="oklch(0.922 0 0)"
          darkValue="oklch(1 0 0 / 15%)"
        />
        <Swatch
          name="Ring"
          cssVar="ring"
          twBg="bg-ring"
          lightValue="oklch(0.708 0 0)"
          darkValue="oklch(0.556 0 0)"
        />
      </ColorGroup>

      {/* Charts */}
      <ColorGroup title="Chart">
        {([1, 2, 3, 4, 5] as const).map((n) => {
          const values: Record<number, string> = {
            1: "oklch(0.809 0.105 251.813)",
            2: "oklch(0.623 0.214 259.815)",
            3: "oklch(0.546 0.245 262.881)",
            4: "oklch(0.488 0.243 264.376)",
            5: "oklch(0.424 0.199 265.638)",
          }
          return (
            <Swatch
              key={n}
              name={`Chart ${n}`}
              cssVar={`chart-${n}`}
              twBg={`bg-chart-${n}`}
              lightValue={values[n]}
              darkValue={values[n]}
            />
          )
        })}
      </ColorGroup>

      {/* Sidebar */}
      <ColorGroup title="Sidebar">
        <PairedSwatch
          name="Sidebar"
          cssVar="sidebar"
          fgCssVar="sidebar-foreground"
          twBg="bg-sidebar"
          twFg="text-sidebar-foreground"
          lightValue="oklch(0.985 0 0)"
          darkValue="oklch(0.205 0 0)"
          lightFgValue="oklch(0.145 0 0)"
          darkFgValue="oklch(0.985 0 0)"
        />
        <PairedSwatch
          name="Sidebar Primary"
          cssVar="sidebar-primary"
          fgCssVar="sidebar-primary-foreground"
          twBg="bg-sidebar-primary"
          twFg="text-sidebar-primary-foreground"
          lightValue="oklch(0.205 0 0)"
          darkValue="oklch(0.488 0.243 264.376)"
          lightFgValue="oklch(0.985 0 0)"
          darkFgValue="oklch(0.985 0 0)"
        />
        <PairedSwatch
          name="Sidebar Accent"
          cssVar="sidebar-accent"
          fgCssVar="sidebar-accent-foreground"
          twBg="bg-sidebar-accent"
          twFg="text-sidebar-accent-foreground"
          lightValue="oklch(0.97 0 0)"
          darkValue="oklch(0.269 0 0)"
          lightFgValue="oklch(0.205 0 0)"
          darkFgValue="oklch(0.985 0 0)"
        />
        <Swatch
          name="Sidebar Border"
          cssVar="sidebar-border"
          twBg="bg-sidebar-border"
          lightValue="oklch(0.922 0 0)"
          darkValue="oklch(1 0 0 / 10%)"
        />
        <Swatch
          name="Sidebar Ring"
          cssVar="sidebar-ring"
          twBg="bg-sidebar-ring"
          lightValue="oklch(0.708 0 0)"
          darkValue="oklch(0.556 0 0)"
        />
      </ColorGroup>

    </div>
  )
}
