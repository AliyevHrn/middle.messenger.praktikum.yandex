import { nanoid } from 'nanoid';
import EventBus from './EventBus';
import {Nullable, Values} from './types';

interface Blockmeta<P = any> {
	tagName: string;
	proprs: P;
}

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_RENDER: 'flow:render',
		FLOW_CDU: 'flow:component-did-update',
	} as const;

	public id = nanoid(6);
	private readonly _meta: Blockmeta;
	protected _element: Nullable<HTMLElement>;
	protected readonly props: P;
	eventBus: () => EventBus<Events>;


	public constructor(tagName: string, props?: P) {
		const eventBus = new EventBus<Events>();

		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props || {} as P);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT, this.props);
	}

	_registerEvents(eventBus):void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
	}

	_createResources():void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init():void {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
	}

	_componentDidMount(props: P) {
		this.componentDidMount(props);
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount(props: P) {}

	_componentDidUpdate(oldProps: P, newProps: P) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();

	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: P, newProps: P) {
		return true;
	}

	setProps = (nextProps: P) => {
		if (!nextProps) {
			return;
		}
		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	_render() {
		const fragment = this.render();

		this._removeEvents();
		this._element.innerHTML = '';

		this._element.appendChild(fragment);
		this._addEvents();
	}

	protected render():DocumentFragment {
		return new DocumentFragment();
	}

	getContent(): HTMLElement {
		return this.element;
	}

	_makePropsProxy(props: P): P {

		return new Proxy (props as unknown as object, {
			get(target: Record<string, unknown>, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target: Record<string, unknown>, prop:string, value: unknown) => {
				target[prop] = value;
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			}
		}) as unknown as P;
	}

	_createDocumentElement(tagName:string):HTMLElement {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	_removeEvents() {
		const events: Record<string, () => void> = (this.props as any).events;

		if(!events || !this._element) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element.addEventListener(event, listener);
		});
	}

	_addEvents() {
		const events: Record<string, () => void> = (this.props as any).events;

		if(!events) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element.addEventListener(event, listener);
		});
	}

	show():void {
		this.getContent().style.display = 'block';
	}

	hide():void {
		this.getContent().style.display = 'none';
	}
}
