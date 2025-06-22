<template>
  <div class="ticket-app">
    <aside class="sidebar">
      <div class="sidebar-item selected"><i class="pi pi-ticket"></i> Tickets</div>
      <div class="sidebar-item"><i class="pi pi-chart-bar"></i> Dashboard</div>
    </aside>

    <div class="ticket-details-main">
      <div class="ticket-header">
        <h1>Ticket #{{ ticket.id }}</h1>
        <select v-model="ticket.status" class="status-select">
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div class="ticket-body">
        <div class="ticket-info">
          <h2>{{ ticket.customer }}</h2>
          <div class="ticket-title">{{ ticket.title }}</div>
          <h3>Status of current ticket:</h3>
          <div class="ticket-status">
            {{ ticket.status }}
          </div>
        </div>
        
        <div class="ticket-comments">
          <h3>Comments</h3>
          <textarea
            v-model="newComment"
            placeholder="Add a comment"
            class="comment-input"
            rows="4"
            ></textarea>
          <button class="send-btn" @click="sendToSupervisor">Send to Supervisor</button>
          <button class="save-btn" @click="saveAndGoBack">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { tickets } from '../data/tickets.ts'



const route = useRoute()
const router = useRouter()
const ticket = reactive({ id: 0, customer: '', title: '', status: '' })

//below function will find selected ticket and fill with info 
onMounted(() => {
  const id = Number(route.params.id)
  const found = tickets.find(t => t.id === id)
  if (found) {
    ticket.id = found.id
    ticket.customer = found.customer
    ticket.title = found.title
    ticket.status = found.status
  }
})


const newComment = ref('')

function sendToSupervisor() {
  alert('Sent to Supervisor!')
}

function saveAndGoBack() {
  router.push('/tickets')
}
</script>

<style scoped>
.ticket-app {
  display: flex;
  height: 100vh;
  background: #f7f5f0;
}
.sidebar {
  width: 190px;
  background: linear-gradient(180deg, #23262f 70%, #3e4050 100%);
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100vh;
}
.sidebar-item {
  color: #fff;
  font-weight: 500;
  padding: 1rem 1.7rem;
  border-radius: 8px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  opacity: 0.85;
}
.sidebar-item.selected {
  background: #22232b;
  opacity: 1;
}
.sidebar-item:hover {
  background: #363945;
  opacity: 1;
}
.ticket-details-main {
  flex: 1;
  padding: 2.5rem 2.5rem;
  background: #f7f5f0;
}
.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}
.status-select {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  background: #fff;
}
.ticket-body {
  display: flex;
  gap: 2.5rem;
}
.ticket-info {
  min-width: 320px;
  flex: 1;
  border-right: 1px solid #e4e4e4;
  padding-right: 2rem;
}
.ticket-info h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}
.ticket-title {
  color: #222;
  margin-bottom: 0.5rem;
}
.ticket-status {
  background: #f1f1f1;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #166534;
  width: fit-content;
  margin-top: 0.7rem;
}
.ticket-comments {
  
  flex: 2;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
}
.ticket-comments h3 {
  margin-bottom: 0.8rem;
}
.comment-box {
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #efefef;
}
.comment-author {
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.comment-time {
  font-weight: 400;
  color: #9e9e9e;
  margin-left: 0.8rem;
  font-size: 0.97rem;
}
.comment-input {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
}
.send-btn, .save-btn {
  width: 100%;
  background: #222;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  margin-bottom: 0.8rem;
  transition: background 0.17s;
}
.send-btn {
  background: #314cc9;
  margin-bottom: 0.7rem;
}
.send-btn:hover {
  background: #203a89;
}
.save-btn:hover {
  background: #333;
}
</style>
