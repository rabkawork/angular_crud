import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Data } from '../../models/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  data: Data[] = [];
  form: FormGroup;
  isEditing = false;
  currentId: number | null = null;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getAll().subscribe((res) => {
      this.data = res;
    });
  }

  create(): void {
    if (this.form.invalid) return;
    this.api.create(this.form.value).subscribe(() => {
      this.getData();
      this.form.reset();
    });
  }

  edit(data: Data): void {
    this.isEditing = true;
    this.currentId = data.id!;
    this.form.patchValue(data);
  }

  update(): void {
    if (this.form.invalid || this.currentId === null) return;
    this.api.update(this.currentId, this.form.value).subscribe(() => {
      this.getData();
      this.cancelEdit();
    });
  }

  delete(id: number): void {
    this.api.delete(id).subscribe(() => {
      this.getData();
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentId = null;
    this.form.reset();
  }
}
