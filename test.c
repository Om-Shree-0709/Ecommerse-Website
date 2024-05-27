#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

// Node structure for XOR linked list
typedef struct Node
{
    int data;
    struct Node *npx; // XOR of next and previous node
} Node;

// Search result structure
typedef struct SearchResult
{
    Node *node;
    int index;
} SearchResult;

// XOR function to get XOR of two node addresses
Node *XOR(Node *a, Node *b)
{
    return (Node *)((uintptr_t)(a) ^ (uintptr_t)(b));
}

// Function to create a new node
Node *createNode(int data)
{
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = data;
    newNode->npx = NULL;
    return newNode;
}

// Insert a node at the beginning of the XOR linked list
void insert(Node **head_ref, int data)
{
    Node *newNode = createNode(data);
    newNode->npx = *head_ref;
    if (*head_ref != NULL)
    {
        (*head_ref)->npx = XOR(newNode, (*head_ref)->npx);
    }
    *head_ref = newNode;
}

// Traverse the XOR linked list
void traverse(Node *head)
{
    Node *curr = head;
    Node *prev = NULL;
    Node *next;

    printf("XOR Linked List: ");
    while (curr != NULL)
    {
        printf("%d ", curr->data);
        next = XOR(prev, curr->npx);
        prev = curr;
        curr = next;
    }
    printf("\n");
}

// Search for a node in the XOR linked list
SearchResult search(Node *head, int key)
{
    Node *curr = head;
    Node *prev = NULL;
    Node *next;
    int index = 0;

    while (curr != NULL)
    {
        if (curr->data == key)
        {
            SearchResult result = {curr, index};
            return result;
        }
        next = XOR(prev, curr->npx);
        prev = curr;
        curr = next;
        index++;
    }

    SearchResult notFound = {NULL, -1};
    return notFound;
}

// Delete a node from the XOR linked list
void delete(Node **head_ref, int key)
{
    Node *curr = *head_ref;
    Node *prev = NULL;
    Node *next;
    Node *prevPrev = NULL;

    while (curr != NULL)
    {
        next = XOR(prev, curr->npx);
        if (curr->data == key)
        {
            if (prev != NULL)
            {
                prev->npx = XOR(prevPrev, next);
            }
            if (next != NULL)
            {
                next->npx = XOR(prev, XOR(curr, next->npx));
            }
            if (curr == *head_ref)
            {
                *head_ref = next;
            }
            free(curr);
            return;
        }
        prevPrev = prev;
        prev = curr;
        curr = next;
    }
    printf("Node with data %d not found.\n", key);
}

int main()
{
    Node *head = NULL;
    int choice, value;

    while (1)
    {
        printf("\nMenu:\n");
        printf("1. Insert\n");
        printf("2. Delete\n");
        printf("3. Traverse\n");
        printf("4. Search\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice)
        {
        case 1:
            printf("Enter value to insert: ");
            scanf("%d", &value);
            insert(&head, value);
            break;
        case 2:
            printf("Enter value to delete: ");
            scanf("%d", &value);
            delete (&head, value);
            break;
        case 3:
            traverse(head);
            break;
        case 4:
            printf("Enter value to search: ");
            scanf("%d", &value);
            SearchResult result = search(head, value);
            if (result.node != NULL)
            {
                printf("Node with data %d found at index %d.\n", value, result.index);
            }
            else
            {
                printf("Node with data %d not found.\n", value);
            }
            break;
        case 5:
            exit(0);
        default:
            printf("Invalid choice. Please try again.\n");
        }
    }
}
