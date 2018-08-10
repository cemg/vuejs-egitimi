const app = new Vue({
    el: '#app',
    name: 'Uzaktan Kurs',
    data: {
        dataItem: {Title: '', Status: false},
        dataList: [
            {Id: 1, Title: 'ders notlarını hazırla', Status: true, List: 'İş'},
            {Id: 2, Title: 'intro videosunu hazırla', Status: false, List: 'İş'},
            {Id: 3, Title: 'kahve al', Status: false, List: 'Genel'}
        ],
        listItems: [
            {Id: 1, Title: 'Genel'},
            {Id: 2, Title: 'İş'},
            {Id: 3, Title: 'Özel'}
        ],
        activeListItem: {},
        filteredDataList: [],
        newListItem: {}
    },
    created() {
        const defaultListItem = this.listItems[0];
        if (defaultListItem != null) {
            this.changeListItem(defaultListItem.Id);
        }
    },
    methods: {
        toggleTodoListStatus(index) {
            this.todoList[index].Status = !this.todoList[index].Status;
        },
        toggleTodoListFinishedStatus(index) {
            this.todoListFinished[index].Status = !this.todoListFinished[index].Status;
        },
        saveItem() {
            if (this.dataItem.Title !== '') {
                this.dataItem.Id = this.dataList.length + 1;
                this.dataItem.List = this.activeListItem.Title;
                this.dataList.push(this.dataItem);
                this.clearForm();
                this.changeListItem(this.activeListItem.Id);
            }
        },
        clearForm() {
            this.dataItem = {Title: '', Status: false};
        },
        deleteItem(id) {
            this.dataList = this.dataList.filter(item => item.Id !== id);
            this.changeListItem(this.activeListItem.Id);
        },
        changeListItem(id) {
            const listItem = this.listItems.find(item => item.Id === id);
            if (listItem != null) {
                this.activeListItem = listItem;
                this.filteredDataList = this.dataList.filter(item => item.List === listItem.Title)
            }
        },
        listItemSave() {
            if (this.newListItem.Title != null) {
                this.newListItem.Id = this.listItems.length + 1;
                this.listItems.push(this.newListItem);
                this.newListItem = {};
            }
        },
        listItemCount(title) {
            return this.dataList.filter(item => item.List === title).length;
        }
    },
    computed: {
        todoList() {
            return this.filteredDataList.filter(todo => todo.Status === false);
        },
        todoListFinished() {
            return this.filteredDataList.filter(todo => todo.Status === true);
        }
    }
});