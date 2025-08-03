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
    opciones: '' // Las opciones se escribirán separadas por saltos de línea
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

  onCreatePoll() {
    const pollData = {
      titulo: this.newPoll.titulo,
      opciones: this.newPoll.opciones.split('\n').filter(opt => opt.trim() !== '')
    };

    if (pollData.titulo && pollData.opciones.length >= 2) {
      this.pollService.createPoll(pollData).subscribe(() => {
        this.loadPolls(); // Recargar la lista
        // Limpiar el formulario
        this.newPoll = { titulo: '', opciones: '' };
      });
    }
  }

  onDeletePoll(pollId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta encuesta?')) {
      this.pollService.deletePoll(pollId).subscribe(() => {
        this.loadPolls(); // Recargar la lista
      });
    }
  }
}
