export interface ComponentTestingStory {
    as: string;
    want: string;
    flags?: string[];
}

export function storyFrom(options: ComponentTestingStory): string {
    let flagsFallback: string[] = options.flags || [];
    let flagsParsed: string = flagsFallback.reduce((prev, curr) => prev + ` @${curr}`, "");
    return `As a ${options.as}, i want to ${options.want}.${flagsParsed}`;
}
