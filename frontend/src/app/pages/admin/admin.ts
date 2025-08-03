import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.html',
})
export class AdminComponent implements OnInit {
  polls: any[] = [];
  newPoll = {
    titulo: '',
    opciones: [{ value: '' }, { value: '' }] // Empezamos con 2 opciones
  };

  constructor(private pollService: PollService) {}

  ngOnInit() {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe((data: any) => {
      this.polls = data;
    });
  }

  addOption() {
    if (this.newPoll.opciones.length < 6) {
      this.newPoll.opciones.push({ value: '' });
    }
  }

  removeOption(index: number) {
    if (this.newPoll.opciones.length > 2) {
      this.newPoll.opciones.splice(index, 1);
    }
  }

  onCreatePoll() {
    const pollData = {
      titulo: this.newPoll.titulo,
      opciones: this.newPoll.opciones
        .map(opt => opt.value)
        .filter(opt => opt.trim() !== '')
    };

    console.log('Datos a enviar:', pollData); // Debug

    if (pollData.titulo && pollData.opciones.length >= 2) {
      this.pollService.createPoll(pollData).subscribe({
        next: () => {
          this.loadPolls();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error completo:', error);
          console.error('Error details:', error.error);
          alert('Error al crear encuesta. Revisa la consola para más detalles.');
        }
      });
    } else {
      alert('El título debe tener contenido y necesitas al menos 2 opciones válidas.');
    }
  }

  resetForm() {
    this.newPoll = {
      titulo: '',
      opciones: [{ value: '' }, { value: '' }]
    };
  }

  onDeletePoll(pollId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta encuesta? Esta acción es permanente.')) {
      this.pollService.deletePoll(pollId).subscribe(() => {
        // Filtramos la encuesta eliminada de la lista local para una actualización instantánea
        this.polls = this.polls.filter(p => p.id !== pollId);
      });
    }
  }
}