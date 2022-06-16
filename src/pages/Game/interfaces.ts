export interface IEntity extends ISize, IPosition {
}

export interface ISize {
    width: number;
    height: number;
}

export interface IPosition {
    top: number;
    left: number;
}

export interface ICircle {
    centerTop: number;
    centerLeft: number;
    radius: number;
}