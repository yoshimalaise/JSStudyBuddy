import { Injectable } from '@angular/core';
import * as acorn from 'acorn';
import * as generator from 'escodegen';
import * as walk from 'acorn-walk';

@Injectable({
  providedIn: 'root'
})
export class AstMutatorService {

  constructor() { }

  mutateAst(ast: acorn.Node, threshold = 0.5) {
    const res = this.cloneTree(ast);
    walk.full(res, n => {
      if ((1 - Math.random()) < threshold) {
        return;
      }
      const node = n as any;
      switch(node.type) {
        case 'UpdateExpression':
          node.prefix = !node.prefix;
          break;
        case 'MemberExpression':
          const tmpObj = node.object;
          node.object = node.property;
          node.property = tmpObj;
          break;
        case 'Literal':
          this.mutateRaw(node);
          break;
        case 'UnaryExpression':
          node.prefix = !node.prefix;
          break;
        case 'ForStatement':
          node.type = 'DoWhileStatement';
          break;
        case 'VariableDeclaration':
          node.kind = node.kind === 'let' ? 'const' : 'let';
          break;
        case 'WhileStatement':
          node.type = 'DoWhileStatement';
          break;
        case 'DoWhileStatement':
          node.type = 'WhileStatement';
          break;
        case 'FunctionDeclaration':
        case 'BlockStatement':
          // swap 2 random statements
          const idx1 = Math.floor(Math.random() * node.body.length);
          const idx2 = Math.floor(Math.random() * node.body.length);
          console.log(node.body[idx1]);
          if (node.body[idx1]?.type === 'ReturnStatement' || node.body[idx2]?.type === 'ReturnStatement') {
            break;
          }
          const tmpBS = node.body[idx1];
          node.body[idx1] = node.body[idx2];
          node.body[idx2] = tmpBS;
          break;
        case 'Ìdentifier':
          // reverse the name
          node.name = node.name.split('').reverse().join('');
          break;
        case 'BinaryExpression':
          // swap the two args
          const tmp =  node.left;
          node.left = node.right;
          node.right = tmp;
          break;
        default:
          break;
      }
     });
    return res;
  }

  private cloneTree(ast: any) {
    return acorn.parse(generator.generate(ast), { ecmaVersion: 9});
  }

  private mutateRaw(node: any) {
    if (node.raw === 'true') {
      node.raw = 'false';
      node.value = false;
    }

    if (node.raw === 'false') {
      node.raw = 'true';
      node.value = true;
    }

    if (!isNaN(node.raw)) {
      const newNumber = Math.floor(Math.random() * 101);
      node.raw = `${newNumber}`;
      node.value = newNumber;
    }
  }

}
