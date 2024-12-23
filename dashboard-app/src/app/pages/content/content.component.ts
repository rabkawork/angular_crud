import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Data } from '../../models/data';
import { CommonModule } from '@angular/common'; // Tambahkan ini
import { ReactiveFormsModule } from '@angular/forms'; // Untuk form handling
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-content',
  standalone: true, // Standalone Component
  imports: [CommonModule, ReactiveFormsModule], // Tambahkan CommonModule di sini
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  form: FormGroup;
  data: Data[] = [];
  isEditing = false;
  editingId: number | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getAll().subscribe((res) => {
      this.data = res;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.apiService.create(this.form.value).subscribe(() => {
        this.form.reset();
        this.loadData();
      });
    }
  }

  edit(item: Data): void {
    this.isEditing = true;
    this.editingId = item.id;
    this.form.patchValue(item);
  }

  update(): void {
    if (this.form.valid && this.editingId !== null) {
      this.apiService.update(this.editingId, this.form.value).subscribe(() => {
        this.cancelEdit();
        this.loadData();
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.form.reset();
  }

  delete(id: number): void {
    this.apiService.delete(id).subscribe(() => {
      this.loadData();
    });
  }
}
