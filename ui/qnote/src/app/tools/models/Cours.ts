export class Cours {
name: string;
code: string
note_total: number;
note_pass:  number;
note_rep:   number;
note_exc:   number;
is_calc: boolean;
is_number: boolean;
map = 300;
public constructor(_code, _name, _note_total, _note_pass, _note_rep,_note_exc,ic, is_number=true ) {
    this.code = _code;
    this.name = _name;
    this.note_total = _note_total;
    this.note_pass  = _note_pass;
    this.note_rep = _note_rep;
    this.note_exc = _note_exc;
    this.is_calc = ic;
    this.is_number = is_number;
    this.map = 300;
  }
}
