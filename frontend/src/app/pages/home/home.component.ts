import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  polls: any[] = [];
  isLoading = true;
  totalVotes = 0;
  currentUserId: string | null;

  // Para el modal de confirmación
  showConfirmationModal = false;
  selectedPoll: any = null;
  selectedOption: any = null;

  constructor(private pollService: PollService, private authService: AuthService) {
    this.currentUserId = this.authService.getCurrentUserId();
  }

  ngOnInit() {
    this.loadPolls();
  }

  loadPolls() {
    this.isLoading = true;
    this.pollService.getPolls().subscribe({
      next: (data: any) => {
        this.polls = data;
        this.calculateTotalVotes();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching polls', err);
        this.isLoading = false;
      }
    });
  }

  confirmVote(poll: any, option: any) {
    if (!this.authService.isLoggedIn()) {
      // Opcional: redirigir a login si no está logueado
      return;
    }
    this.selectedPoll = poll;
    this.selectedOption = option;
    this.showConfirmationModal = true;
  }

  vote() {
    if (!this.selectedPoll || !this.selectedOption) return;

    this.pollService.vote(this.selectedPoll.id, this.selectedOption.id).subscribe({
      next: (updatedPoll: any) => {
        const index = this.polls.findIndex(p => p.id === this.selectedPoll.id);
        if (index !== -1) {
          this.polls[index] = updatedPoll;
          this.calculateTotalVotes();
        }
        this.showConfirmationModal = false;
      },
      error: (err) => {
        console.error('Error voting', err);
        // Aquí podrías mostrar un mensaje de error al usuario
        this.showConfirmationModal = false;
      }
    });
  }

  hasUserVoted(poll: any): boolean {
    return poll.votantesUids.includes(this.currentUserId);
  }

  calculatePercentage(poll: any, option: any): number {
    const totalVotesInPoll = poll.opciones.reduce((sum: number, opt: any) => sum + opt.votos, 0);
    if (totalVotesInPoll === 0) return 0;
    return (option.votos / totalVotesInPoll) * 100;
  }

  calculateTotalVotes() {
    this.totalVotes = this.polls.reduce((total, poll) => {
      return total + poll.opciones.reduce((sum: number, opt: any) => sum + opt.votos, 0);
    }, 0);
  }
}