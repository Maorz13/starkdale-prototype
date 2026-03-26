"use client"

import { useState } from "react"
import { Info, AlertCircle, CheckCircle, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function AtomSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export function AtomsTabContent() {
  const [sliderValue, setSliderValue] = useState([40])
  const [checked, setChecked] = useState(true)
  const [switched, setSwitched] = useState(true)

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">

      {/* Buttons */}
      <AtomSection title="Button — Variants">
        <Row label="All variants (size: default)">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </Row>
        <Row label="Sizes (variant: default)">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </Row>
        <Row label="Disabled state">
          <Button disabled>Default</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="secondary" disabled>Secondary</Button>
        </Row>
      </AtomSection>

      <Separator />

      {/* Badge */}
      <AtomSection title="Badge — Variants">
        <Row>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </Row>
      </AtomSection>

      <Separator />

      {/* Form inputs */}
      <AtomSection title="Form Controls">
        <Row label="Input">
          <div className="w-64 space-y-2">
            <Label htmlFor="ds-input">Label</Label>
            <Input id="ds-input" placeholder="Placeholder text" />
          </div>
          <div className="w-64 space-y-2">
            <Label htmlFor="ds-input-disabled">Disabled</Label>
            <Input id="ds-input-disabled" placeholder="Disabled" disabled />
          </div>
        </Row>
        <Row label="Textarea">
          <div className="w-64 space-y-2">
            <Label htmlFor="ds-textarea">Message</Label>
            <Textarea id="ds-textarea" placeholder="Enter your message..." rows={3} />
          </div>
        </Row>
        <Row label="Select">
          <div className="w-56 space-y-2">
            <Label>Interest</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residences">Residences</SelectItem>
                <SelectItem value="resort">Resort Stay</SelectItem>
                <SelectItem value="wellness">Wellness & Spa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Row>
      </AtomSection>

      <Separator />

      {/* Toggles */}
      <AtomSection title="Toggles">
        <Row label="Checkbox">
          <div className="flex items-center gap-2">
            <Checkbox
              id="ds-check-on"
              checked={checked}
              onCheckedChange={(v) => setChecked(!!v)}
            />
            <Label htmlFor="ds-check-on">Checked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="ds-check-off" />
            <Label htmlFor="ds-check-off">Unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="ds-check-disabled" disabled />
            <Label htmlFor="ds-check-disabled" className="text-muted-foreground">Disabled</Label>
          </div>
        </Row>
        <Row label="Switch">
          <div className="flex items-center gap-2">
            <Switch
              id="ds-switch-on"
              checked={switched}
              onCheckedChange={setSwitched}
            />
            <Label htmlFor="ds-switch-on">On</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="ds-switch-off" />
            <Label htmlFor="ds-switch-off">Off</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="ds-switch-disabled" disabled />
            <Label htmlFor="ds-switch-disabled" className="text-muted-foreground">Disabled</Label>
          </div>
        </Row>
        <Row label="Radio Group">
          <RadioGroup defaultValue="option-a" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-a" id="ds-radio-a" />
              <Label htmlFor="ds-radio-a">Option A</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-b" id="ds-radio-b" />
              <Label htmlFor="ds-radio-b">Option B</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-c" id="ds-radio-c" disabled />
              <Label htmlFor="ds-radio-c" className="text-muted-foreground">Disabled</Label>
            </div>
          </RadioGroup>
        </Row>
      </AtomSection>

      <Separator />

      {/* Data display */}
      <AtomSection title="Data Display">
        <Row label="Slider">
          <div className="w-64 space-y-2">
            <p className="text-xs text-muted-foreground">Value: {sliderValue[0]}</p>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </Row>
        <Row label="Progress">
          <div className="w-64 space-y-1">
            <p className="text-xs text-muted-foreground">25%</p>
            <Progress value={25} />
          </div>
          <div className="w-64 space-y-1">
            <p className="text-xs text-muted-foreground">65%</p>
            <Progress value={65} />
          </div>
          <div className="w-64 space-y-1">
            <p className="text-xs text-muted-foreground">100%</p>
            <Progress value={100} />
          </div>
        </Row>
        <Row label="Avatar — sizes">
          <Avatar size="sm">
            <AvatarImage src="https://i.pravatar.cc/40?img=1" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src="https://i.pravatar.cc/40?img=2" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="https://i.pravatar.cc/40?img=3" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </Row>
        <Row label="Avatar — group">
          <AvatarGroup>
            <Avatar><AvatarImage src="https://i.pravatar.cc/40?img=4" /><AvatarFallback>A</AvatarFallback></Avatar>
            <Avatar><AvatarImage src="https://i.pravatar.cc/40?img=5" /><AvatarFallback>B</AvatarFallback></Avatar>
            <Avatar><AvatarImage src="https://i.pravatar.cc/40?img=6" /><AvatarFallback>C</AvatarFallback></Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </Row>
        <Row label="Skeleton">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-24 w-48 rounded-lg" />
        </Row>
        <Row label="Separator">
          <div className="w-64">
            <p className="mb-2 text-xs text-muted-foreground">Horizontal</p>
            <Separator />
          </div>
          <div className="flex h-12 items-center gap-3">
            <p className="text-xs text-muted-foreground">Vertical →</p>
            <Separator orientation="vertical" />
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Right</span>
          </div>
        </Row>
      </AtomSection>

      <Separator />

      {/* Alerts */}
      <AtomSection title="Alert">
        <div className="space-y-3 max-w-xl">
          <Alert>
            <Info className="size-4" />
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              Use this for general information, tips, or neutral system messages.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>
              Use this for errors, warnings, or actions that can't be undone.
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="size-4" />
            <AlertTitle>No icon variant</AlertTitle>
            <AlertDescription>
              Alerts also work without an icon — the layout adjusts automatically.
            </AlertDescription>
          </Alert>
        </div>
      </AtomSection>

      <Separator />

      {/* Card */}
      <AtomSection title="Card">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description or subtitle goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Main card content area. Can hold any content — text, lists, forms, etc.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Action</Button>
              <Button size="sm" variant="ghost">Cancel</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Minimal Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A card with just a title and content — footer is optional.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/40 bg-primary/5">
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-1">Featured</Badge>
              <CardTitle>Highlighted Card</CardTitle>
              <CardDescription>Cards accept className overrides for special states.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use className to apply custom border or background for featured or active states.
              </p>
            </CardContent>
          </Card>
        </div>
      </AtomSection>

    </div>
  )
}
