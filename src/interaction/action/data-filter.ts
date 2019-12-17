import Action from './base';
import { getDelegationObject, isList } from './util';

class DataFilter extends Action {
  /**
   * 过滤数据
   */
  public filter() {
    const delegateObject = getDelegationObject(this.context);
    // 列表类的组件能够触发
    if (isList(delegateObject)) {
      const view = this.context.view;
      const { component } = delegateObject;
      const field = component.get('field');
      if (field) {
        const unCheckedItems = component.getItemsByState('unchecked');
        const scale = view.getScaleByField(field);
        const names = unCheckedItems.map((item) => item.name);
        // if (names.length) { chart.filter 目前不支持 null，支持后这个地方改成更高效的形式

        // } else {
        //   view.filter(field, null);
        // }
        view.filter(field, (value) => {
          const text = scale.getText(value);
          return names.indexOf(text) === -1;
        });
        view.render(true);
      }
    }
    // 后面补充 slider 的触发
  }
}

export default DataFilter;
