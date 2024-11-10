"use client"

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    LabelList,
    Line,
    LineChart,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    Rectangle,
    ReferenceLine,
    XAxis,
    YAxis,
    
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

export const description = "A collection of charts for construction and renovation service metrics."

export function Charts() {
    return (
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
            <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                <Card className="lg:max-w-md">
                    <CardHeader className="space-y-0 pb-2">
                        <CardDescription>Today</CardDescription>
                        <CardTitle className="text-4xl tabular-nums">
                            42{" "}
                            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                quotes
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                quotes: {
                                    label: "Quotes",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                        >
                            <BarChart
                                accessibilityLayer
                                margin={{
                                    left: -4,
                                    right: -4,
                                }}
                                data={[
                                    { date: "2024-10-05", quotes: 28 },
                                    { date: "2024-10-06", quotes: 35 },
                                    { date: "2024-10-07", quotes: 42 },
                                    { date: "2024-10-08", quotes: 38 },
                                    { date: "2024-10-09", quotes: 45 },
                                    { date: "2024-10-10", quotes: 39 },
                                    { date: "2024-10-11", quotes: 42 },
                                ]}
                            >
                                <Bar
                                    dataKey="quotes"
                                    fill="var(--color-quotes)"
                                    radius={5}
                                    fillOpacity={0.6}
                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={4}
                                    tickFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            weekday: "short",
                                        })
                                    }}
                                />
                                <ChartTooltip
                                    defaultIndex={2}
                                    content={
                                        <ChartTooltipContent
                                            hideIndicator
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                            }}
                                        />
                                    }
                                    cursor={false}
                                />
                                <ReferenceLine
                                    y={40}
                                    stroke="hsl(var(--muted-foreground))"
                                    strokeDasharray="3 3"
                                    strokeWidth={1}
                                >
                                    <Label
                                        position="insideBottomLeft"
                                        value="Average quotes per day"
                                        offset={10}
                                        fill="hsl(var(--foreground))"
                                    />
                                    <Label
                                        position="insideTopLeft"
                                        value="40"
                                        className="text-lg"
                                        fill="hsl(var(--foreground))"
                                        offset={10}
                                        startOffset={100}
                                    />
                                </ReferenceLine>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1">
                        <CardDescription>
                            Over the past 7 days, you have received{" "}
                            <span className="font-medium text-foreground">269</span> quotes.
                        </CardDescription>
                        <CardDescription>
                            You need to review{" "}
                            <span className="font-medium text-foreground">31</span> more
                            quotes to reach your weekly goal.
                        </CardDescription>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col lg:max-w-md">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                        <div>
                            <CardDescription>Avg. Response Time</CardDescription>
                            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                4.2
                                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                                    hours
                                </span>
                            </CardTitle>
                        </div>
                        <div>
                            <CardDescription>Quote Acceptance Rate</CardDescription>
                            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                68
                                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                                    %
                                </span>
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 items-center">
                        <ChartContainer
                            config={{
                                responseTime: {
                                    label: "Response Time",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="w-full"
                        >
                            <LineChart
                                accessibilityLayer
                                margin={{
                                    left: 14,
                                    right: 14,
                                    top: 10,
                                }}
                                data={[
                                    { date: "2024-01-01", responseTime: 4.5 },
                                    { date: "2024-01-02", responseTime: 5.2 },
                                    { date: "2024-01-03", responseTime: 3.8 },
                                    { date: "2024-01-04", responseTime: 4.2 },
                                    { date: "2024-01-05", responseTime: 3.9 },
                                    { date: "2024-01-06", responseTime: 4.1 },
                                    { date: "2024-01-07", responseTime: 4.2 },
                                ]}
                            >
                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    vertical={false}
                                    stroke="hsl(var(--muted-foreground))"
                                    strokeOpacity={0.5}
                                />
                                <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            weekday: "short",
                                        })
                                    }}
                                />
                                <Line
                                    dataKey="responseTime"
                                    type="natural"
                                    fill="var(--color-responseTime)"
                                    stroke="var(--color-responseTime)"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{
                                        fill: "var(--color-responseTime)",
                                        stroke: "var(--color-responseTime)",
                                        r: 4,
                                    }}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            indicator="line"
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                            }}
                                        />
                                    }
                                    cursor={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
                <Card className="max-w-xs">
                    <CardHeader>
                        <CardTitle>Quote Comparison</CardTitle>
                        <CardDescription>
                            You're receiving more quotes per day this year compared to last year.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid auto-rows-min gap-2">
                            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                42.5
                                <span className="text-sm font-normal text-muted-foreground">
                                    quotes/day
                                </span>
                            </div>
                            <ChartContainer
                                config={{
                                    quotes: {
                                        label: "quotes",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                                className="aspect-auto h-[32px] w-full"
                            >
                                <BarChart
                                    accessibilityLayer
                                    layout="vertical"
                                    margin={{
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    data={[
                                        {
                                            date: "2024",
                                            quotes: 42.5,
                                        },
                                    ]}
                                >
                                    <Bar
                                        dataKey="quotes"
                                        fill="var(--color-quotes)"
                                        radius={4}
                                        barSize={32}
                                    >
                                        <LabelList
                                            position="insideLeft"
                                            dataKey="date"
                                            offset={8}
                                            fontSize={12}
                                            fill="white"
                                        />
                                    </Bar>
                                    <YAxis dataKey="date" type="category" tickCount={1} hide />
                                    <XAxis dataKey="quotes" type="number" hide />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="grid auto-rows-min gap-2">
                            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                35.8
                                <span className="text-sm font-normal text-muted-foreground">
                                    quotes/day
                                </span>
                            </div>
                            <ChartContainer
                                config={{
                                    quotes: {
                                        label: "quotes",
                                        color: "hsl(var(--muted))",
                                    },
                                }}
                                className="aspect-auto h-[32px] w-full"
                            >
                                <BarChart
                                    accessibilityLayer
                                    layout="vertical"
                                    margin={{
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    data={[
                                        {
                                            date: "2023",
                                            quotes: 35.8,
                                        },
                                    ]}
                                >
                                    <Bar
                                        dataKey="quotes"
                                        fill="var(--color-quotes)"
                                        radius={4}
                                        barSize={32}
                                    >
                                        <LabelList
                                            position="insideLeft"
                                            dataKey="date"
                                            offset={8}
                                            fontSize={12}
                                            fill="hsl(var(--muted-foreground))"
                                        />
                                    </Bar>
                                    <YAxis dataKey="date" type="category" tickCount={1} hide />
                                    <XAxis dataKey="quotes" type="number" hide />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="max-w-xs">
                    <CardHeader className="p-4 pb-0">
                        <CardTitle>Service Provider Ratings</CardTitle>
                        <CardDescription>
                            The average rating for service providers over the last 7 days was 4.2 stars.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                        <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                            4.2
                            <span className="text-sm font-normal text-muted-foreground">
                                stars
                            </span>
                        </div>
                        <ChartContainer
                            config={{
                                ratings: {
                                    label: "Ratings",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="ml-auto w-[72px]"
                        >
                            <BarChart
                                accessibilityLayer
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                                data={[
                                    { date: "2024-01-01", ratings: 4.0 },
                                    { date: "2024-01-02", ratings: 4.2 },
                                    { date: "2024-01-03", ratings: 4.5 },
                                    { date: "2024-01-04", ratings: 4.1 },
                                    { date: "2024-01-05", ratings: 4.3 },
                                    { date: "2024-01-06", ratings: 4.4 },
                                    { date: "2024-01-07", ratings: 4.2 },
                                ]}
                            >
                                <Bar
                                    dataKey="ratings"
                                    fill="var(--color-ratings)"
                                    radius={2}
                                    fillOpacity={0.2}
                                    activeIndex={6}
                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={4}
                                    hide
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="max-w-xs">
                    <CardContent className="flex gap-4 p-4 pb-2">
                        <ChartContainer
                            config={{
                                electrical: {
                                    label: "Electrical",
                                    color: "hsl(var(--chart-1))",
                                },
                                plumbing: {
                                    label: "Plumbing",
                                    color: "hsl(var(--chart-2))",
                                },
                                carpentry: {
                                    label: "Carpentry",
                                    color: "hsl(var(--chart-3))",
                                },
                            }}
                            className="h-[140px] w-full"
                        >
                            <BarChart
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 10,
                                }}
                                data={[
                                    {
                                        service: "carpentry",
                                        value: (28 / 40) * 100,
                                        label: "28/40 quotes",
                                        fill: "var(--color-carpentry)",
                                    },
                                    {
                                        service: "plumbing",
                                        value: (35 / 40) * 100,
                                        label: "35/40 quotes",
                                        fill: "var(--color-plumbing)",
                                    },
                                    {
                                        service: "electrical",
                                        value: (32 / 40) * 100,
                                        label: "32/40 quotes",
                                        fill: "var(--color-electrical)",
                                    },
                                ]}
                                layout="vertical"
                                barSize={32}
                                barGap={2}
                            >
                                <XAxis type="number" dataKey="value" hide />
                                <YAxis
                                    dataKey="service"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={4}
                                    axisLine={false}
                                    className="capitalize"
                                />
                                <Bar dataKey="value" radius={5}>
                                    <LabelList
                                        position="insideLeft"
                                        dataKey="label"
                                        fill="white"
                                        offset={8}
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex flex-row border-t p-4">
                        <div className="flex w-full items-center gap-2">
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-xs text-muted-foreground">Electrical</div>
                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                    $85
                                    <span className="text-sm font-normal text-muted-foreground">
                                        /hr
                                    </span>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-xs text-muted-foreground">Plumbing</div>
                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                    $95
                                    <span className="text-sm font-normal text-muted-foreground">
                                        /hr
                                    </span>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-xs text-muted-foreground">Carpentry</div>
                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                    $75
                                    <span className="text-sm font-normal text-muted-foreground">
                                        /hr
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid w-full flex-1 gap-6">
                <Card className="max-w-xs">
                    <CardContent className="flex gap-4 p-4">
                        <div className="grid items-center gap-2">
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-sm text-muted-foreground">Quotes Received</div>
                                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                    269/300
                                    <span className="text-sm font-normal text-muted-foreground">
                                        weekly goal
                                    </span>
                                </div>
                            </div>
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-sm text-muted-foreground">Quote Conversion</div>
                                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                    68/100
                                    <span className="text-sm font-normal text-muted-foreground">
                                        %
                                    </span>
                                </div>
                            </div>
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                    4.2/5.0
                                    <span className="text-sm font-normal text-muted-foreground">
                                        stars
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ChartContainer
                            config={{
                                quotes: {
                                    label: "Quotes",
                                    color: "hsl(var(--chart-1))",
                                },
                                conversion: {
                                    label: "Conversion",
                                    color: "hsl(var(--chart-2))",
                                },
                                satisfaction: {
                                    label: "Satisfaction",
                                    color: "hsl(var(--chart-3))",
                                },
                            }}
                            className="mx-auto aspect-square w-full max-w-[80%]"
                        >
                            <RadialBarChart
                                margin={{
                                    left: -10,
                                    right: -10,
                                    top: -10,
                                    bottom: -10,
                                }}
                                data={[
                                    {
                                        name: "satisfaction",
                                        value: (4.2 / 5) * 100,
                                        fill: "var(--color-satisfaction)",
                                    },
                                    {
                                        name: "conversion",
                                        value: 68,
                                        fill: "var(--color-conversion)",
                                    },
                                    {
                                        name: "quotes",
                                        value: (269 / 300) * 100,
                                        fill: "var(--color-quotes)",
                                    },
                                ]}
                                innerRadius="20%"
                                barSize={24}
                                startAngle={90}
                                endAngle={450}
                            >
                                <PolarAngleAxis
                                    type="number"
                                    domain={[0, 100]}
                                    dataKey="value"
                                    tick={false}
                                />
                                <RadialBar dataKey="value" background cornerRadius={5} />
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="max-w-xs">
                    <CardHeader className="p-4 pb-0">
                        <CardTitle>Quote Value Trend</CardTitle>
                        <CardDescription>
                            The average quote value is $7,542. There's an upward trend in project sizes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
                        <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                            $7,542
                            <span className="text-sm font-normal text-muted-foreground">
                                avg. quote
                            </span>
                        </div>
                        <ChartContainer
                            config={{
                                quoteValue: {
                                    label: "Quote Value",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="ml-auto w-[64px]"
                        >
                            <BarChart
                                accessibilityLayer
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                                data={[
                                    { date: "2024-01-01", quoteValue: 6254 },
                                    { date: "2024-01-02", quoteValue: 6845 },
                                    { date: "2024-01-03", quoteValue: 7123 },
                                    { date: "2024-01-04", quoteValue: 7532 },
                                    { date: "2024-01-05", quoteValue: 7845 },
                                    { date: "2024-01-06", quoteValue: 8012 },
                                    { date: "2024-01-07", quoteValue: 8189 },
                                ]}
                            >
                                <Bar
                                    dataKey="quoteValue"
                                    fill="var(--color-quoteValue)"
                                    radius={2}
                                    fillOpacity={0.2}
                                    activeIndex={6}
                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={4}
                                    hide
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="max-w-xs">
                    <CardHeader className="space-y-0 pb-0">
                        <CardDescription>Quote Processing Time</CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                            2
                            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                hr
                            </span>
                            45
                            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                min
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ChartContainer
                            config={{
                                processingTime: {
                                    label: "Processing Time",
                                    color: "hsl(var(--chart-2))",
                                },
                            }}
                        >
                            <AreaChart
                                accessibilityLayer
                                data={[
                                    { date: "2024-01-01", processingTime: 3.2 },
                                    { date: "2024-01-02", processingTime: 2.8 },
                                    { date: "2024-01-03", processingTime: 3.1 },
                                    { date: "2024-01-04", processingTime: 2.6 },
                                    { date: "2024-01-05", processingTime: 2.4 },
                                    { date: "2024-01-06", processingTime: 2.9 },
                                    { date: "2024-01-07", processingTime: 2.75 },
                                ]}
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                            >
                                <XAxis dataKey="date" hide />
                                <YAxis domain={["dataMin - 1", "dataMax + 1"]} hide />
                                <defs>
                                    <linearGradient id="fillProcessingTime" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-processingTime)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-processingTime)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <Area
                                    dataKey="processingTime"
                                    type="natural"
                                    fill="url(#fillProcessingTime)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-processingTime)"
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                    formatter={(value) => (
                                        <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                                            Processing Time
                                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                {value}
                                                <span className="font-normal text-muted-foreground">
                                                    hr
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}