import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Data } from '../../models/data';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import * as bootstrap from 'bootstrap';  // Add this line to import bootstrap

@Component({
  selector: 'component-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, SidebarComponent, FooterComponent],
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
        this.closeModal();
      });
    }
  }

  edit(item: Data): void {
    this.isEditing = true;
    this.editingId = item.id;
    this.form.patchValue(item);
    this.openEditModal(item);
  }

  update(): void {
    if (this.form.valid && this.editingId !== null) {
      this.apiService.update(this.editingId, this.form.value).subscribe(() => {
        this.cancelEdit();
        this.loadData();
        this.closeModal();
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.form.reset();
    this.closeModal();
  }

  delete(id: number): void {
    this.apiService.delete(id).subscribe(() => {
      this.loadData();
    });
  }

  openAddModal(): void {
    this.isEditing = false;
    this.form.reset();
    const modal = new bootstrap.Modal(document.getElementById('dataModal')!);
    modal.show();
  }

  openEditModal(item: Data): void {
    this.isEditing = true;
    this.editingId = item.id;
    this.form.patchValue(item);
    const modal = new bootstrap.Modal(document.getElementById('dataModal')!);
    modal.show();
  }

  closeModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('dataModal')!);
    modal.hide();
  }
}
