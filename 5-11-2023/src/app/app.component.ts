import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  list: any[] = [];
  title: string = '';
  content: string = '';
  formValues: string = '';
  selected: Note = {title: '', content: ''};

  ngOnInit() {
  }
  deleteItem(item: object) {
    let index = this.list.indexOf(item);

    if (index == this.list.indexOf(this.selected)) {
      this.clearAll();
    }
    this.list.splice(index, 1);

  }

  select(item: Note, title: string, content: string) {
      this.title = title;
      this.content = content;
      this.selected = item;
  }

  clearAll() {
    this.selected = {title: '', content: ''};
    this.title = '';
    this.content = '';
  }

  addItem() {

    if (this.selected.title == '' && this.title != '') {
      this.list.push({ content: this.content, title: this.title});
    } else if (this.title != '') {
      console.log("yes")
      let index = this.list.indexOf(this.selected);
      this.list[index].title = this.title;
      this.list[index].content = this.content;

    }
  }
}
interface Note {
  title: string,
  content: string
}
