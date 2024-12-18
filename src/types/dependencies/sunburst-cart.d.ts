declare module 'sunburst-chart' {
    interface SunburstChartInstance {
        (element: HTMLElement): void;
        width(width: number): SunburstChartInstance;
        height(height: number): SunburstChartInstance;
        data(data: any): SunburstChartInstance;
        label(key: string): SunburstChartInstance;
        size(key: string): SunburstChartInstance;
        color(fn: (d: any) => string): SunburstChartInstance;
        transitionDuration(duration: number): SunburstChartInstance;
    }

    function Sunburst(): SunburstChartInstance;

    export default Sunburst;
}

