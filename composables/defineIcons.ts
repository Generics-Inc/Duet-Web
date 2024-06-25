export type IconsInnerType = { [name: string]: string };

export default <T extends IconsInnerType>(config: T): T => config;
