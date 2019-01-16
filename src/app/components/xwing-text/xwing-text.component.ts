import { Component, Input, OnInit } from '@angular/core';
import { XwingIconComponent } from '../xwing-icon/xwing-icon.component';

@Component({
  selector: 'xwing-text',
  templateUrl: './xwing-text.component.html',
  styleUrls: ['./xwing-text.component.scss']
})
export class XwingTextComponent implements OnInit {

  @Input() text = 'Test text';
  icon_html = '<i class=\'CLASS\'></i>';
  output = '';

  constructor() { }

  mangle(text: string) {
    text = this.stripNumberBrackets(text);

    // Match [Icon]
    const bracketMatches = text.match(/\[[a-zA-Z\s]*\]/g);

    if (bracketMatches) {
      bracketMatches.forEach(
        (match) => {
          const icon = this.icon_html.replace(
            'CLASS',
            XwingIconComponent.getClass(
              this.stripBrackets(match)
            )
          );
          text = text.replace(match, icon);
        }
      );
    }

    text = text.replace('Action:', '<br /><br /><b>Action:</b>');

    return text;
  }

  stripNumberBrackets(text: string) {
    const numberMatches = text.match(/\[[0-9] \[[a-zA-Z\s]*\]\]/g);
    if (numberMatches) {
      numberMatches.forEach(
        (match) => {
          text = text.replace(match, this.stripBrackets(match));
        }
      );
    }
    return text;
  }

  stripBrackets(text: string) {
    return text.substring(1, text.length - 1);
  }

  ngOnInit() {
    this.output = this.mangle(this.text);
  }

}
