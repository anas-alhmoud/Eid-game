class ObserverList {
    constructor() {
        this.list = [];
    }

    add(observer) {
        return this.list.push(observer);
    }

    notify(action, observable) {
        let list = this.list.filter(ob => ob[action]);

        for (let index = 0; index < list.length; index++) {
            if (this.contains(list[index].self, observable.self)) {
                list[index][[action]](observable);
                break;
            }
        }
    }

    contains(observer, observable) {

        var observerRect = observer.getBoundingClientRect();
        var observableRect = observable.getBoundingClientRect();

        return observerRect.top + observerRect.height > observableRect.top
            && observerRect.left + observerRect.width > observableRect.left
            && observerRect.bottom - observerRect.height < observableRect.bottom
            && observerRect.right - observerRect.width < observableRect.right
    }

    reomve(observer) {
        this.list = this.list.filter(ob => ob !== observer)
    }
}
