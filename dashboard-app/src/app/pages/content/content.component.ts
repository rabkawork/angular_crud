import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Data } from '../../models/data';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import * as bootstrap from 'bootstrap';  // Import bootstrap

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
  successMessage: string = '';  // Store success message
  showAlert: boolean = false;  // Toggle visibility of success alert

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
      this.apiService.create(this.form.value).subscribe((response) => {
        if (response.status === 201) {
          this.successMessage = 'Data added successfully!';
          this.showAlert = true;
          setTimeout(() => this.showAlert = false, 5000); // Hide alert after 5 seconds
          this.form.reset();
          this.loadData();
          this.closeModal();  // Close modal after success
        }
      }, (error) => {
        console.error(error);
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
      this.apiService.update(this.editingId, this.form.value).subscribe((response) => {
        if (response.status === 200) {
          this.successMessage = 'Data updated successfully!';
          this.showAlert = true;
          setTimeout(() => this.showAlert = false, 5000); // Hide alert after 5 seconds
        }
        this.cancelEdit();
        this.loadData();
        this.closeModal();  // Close modal after success
      }, (error) => {
        console.error(error);
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
    this.showModal();
  }

  openEditModal(item: Data): void {
    this.isEditing = true;
    this.editingId = item.id;
    this.form.patchValue(item);
    this.showModal();
  }

  showModal(): void {
    const modalElement = document.getElementById('dataModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found!');
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('dataModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);  // Get the modal instance
      if (modal) {
        modal.hide();  // Hide the modal
      }
    } else {
      console.error('Modal element not found!');
    }
  }
}
